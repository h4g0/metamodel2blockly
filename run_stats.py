import os
import json
from get_content_mtamodel import get_metamodel_info

# -----------------------------------------------------------
# 1️⃣ Parse both Blockly JSON and Ecore metamodel
# -----------------------------------------------------------
def parse_blockly_and_ecore(blockly_path, ecore_path):
    """Parses both the Blockly JSON and its matching Ecore metamodel."""
    with open(blockly_path, "r", encoding="utf-8") as f:
        blockly_data = json.load(f)

    blockly_classes = set()
    blockly_refs = set()

    for block_name, block_data in blockly_data.items():
        args = block_data.get("args0", [])
        has_input_statement = any(arg.get("type") == "input_statement" for arg in args)
        has_input_value = any(arg.get("type") == "input_value" for arg in args)
        has_previous_next = block_data.get("previousStatement") is not None or block_data.get("nextStatement") is not None
        has_output = block_data.get("output") is not None

        # Treat as class if it has any structural feature or output
        if has_input_statement or has_input_value or has_previous_next or has_output:
            blockly_classes.add(block_name)
        else:
            blockly_refs.add(block_name)

    # Parse Ecore metamodel
    try:
        ecore_info = get_metamodel_info(ecore_path)
    except Exception as e:
        print(f"  ❌ Failed to parse Ecore file: {ecore_path}")
        print(f"     Error: {e}")
        ecore_info = []

    # Print detailed info
    print(f"\n📦 File: {os.path.basename(blockly_path)}")
    print(f"  Blockly Classes: {sorted(blockly_classes)}")
    print(f"  Blockly Refs: {sorted(blockly_refs)}")
    print(f"  Matching Ecore: {os.path.basename(ecore_path)}")
    print(f"  Ecore Metamodel Info: {ecore_info}")
    print("-" * 90)

    return {
        "file": os.path.basename(blockly_path),
        "blockly_classes": blockly_classes,
        "blockly_refs": blockly_refs,
        "ecore_info": ecore_info,
    }

# -----------------------------------------------------------
# 2️⃣ Compare Blockly vs Ecore
# -----------------------------------------------------------
def compare_blockly_and_ecore(parsed_result):
    """Compares Blockly and Ecore classes and relationships."""
    file_name = parsed_result["file"]
    blockly_classes = parsed_result["blockly_classes"]
    blockly_refs = parsed_result["blockly_refs"]
    ecore_info = parsed_result["ecore_info"]

    ecore_classes = set()
    ecore_relationships = set()

    # Handle various formats returned by get_metamodel_info
    if isinstance(ecore_info, list):
        for entry in ecore_info:
            if isinstance(entry, dict):
                cls_name = entry.get("Class") or entry.get("name")
                if cls_name:
                    ecore_classes.add(cls_name)
                for rel in entry.get("Relationships", []):
                    if isinstance(rel, dict):
                        rel_name = rel.get("name")
                        if rel_name:
                            ecore_relationships.add(rel_name)
                    elif isinstance(rel, (list, tuple)) and len(rel) > 0:
                        ecore_relationships.add(str(rel[0]))
            elif isinstance(entry, (list, tuple)) and len(entry) > 0:
                ecore_classes.add(str(entry[0]))

    # Compare results
    missing_in_blockly = ecore_classes - blockly_classes
    missing_in_ecore = blockly_classes - ecore_classes
    missing_rels_in_blockly = ecore_relationships - blockly_refs
    missing_rels_in_ecore = blockly_refs - ecore_relationships

    differences = {
        "classes_mismatch": bool(missing_in_blockly or missing_in_ecore),
        "relationships_mismatch": bool(missing_rels_in_blockly or missing_rels_in_ecore),
        "missing_in_blockly": missing_in_blockly,
        "missing_in_ecore": missing_in_ecore,
        "missing_rels_in_blockly": missing_rels_in_blockly,
        "missing_rels_in_ecore": missing_rels_in_ecore,
    }

    # Print immediate comparison results
    print(f"\n🔍 Comparison for {file_name}")
    if not differences["classes_mismatch"]:
        print("  ✅ Classes match.")
    else:
        print("  ❌ Class differences found:")
        if missing_in_blockly:
            print(f"     Missing in Blockly: {sorted(missing_in_blockly)}")
        if missing_in_ecore:
            print(f"     Missing in Ecore: {sorted(missing_in_ecore)}")

    if not differences["relationships_mismatch"]:
        print("  ✅ Relationships match.")
    else:
        print("  ❌ Relationship differences found:")
        if missing_rels_in_blockly:
            print(f"     Missing in Blockly: {sorted(missing_rels_in_blockly)}")
        if missing_rels_in_ecore:
            print(f"     Missing in Ecore: {sorted(missing_rels_in_ecore)}")

    print("=" * 90)
    return differences

# -----------------------------------------------------------
# 3️⃣ Main: process folder and print summary with details + %
# -----------------------------------------------------------
def main(json_folder="tests/json", ecore_folder="metamodels"):
    summary = {
        "matched": [],
        "differences": [],
        "missing": [],
        "details": {}
    }

    for filename in sorted(os.listdir(json_folder)):
        if not filename.endswith(".json"):
            continue

        blockly_path = os.path.join(json_folder, filename)

        # Match Ecore filename (remove "-blocks" suffix)
        base_name = os.path.splitext(filename)[0]
        if base_name.endswith("-blocks"):
            base_name = base_name[:-7]
        ecore_name = base_name + ".ecore"
        ecore_path = os.path.join(ecore_folder, ecore_name)

        if not os.path.exists(ecore_path):
            print(f"\n⚠️ No matching Ecore file for {filename} ({ecore_name} missing)")
            summary["missing"].append(filename)
            continue

        parsed = parse_blockly_and_ecore(blockly_path, ecore_path)
        diffs = compare_blockly_and_ecore(parsed)

        # Record details for summary
        summary["details"][filename] = diffs

        if not diffs["classes_mismatch"] and not diffs["relationships_mismatch"]:
            summary["matched"].append(filename)
        else:
            summary["differences"].append(filename)

    # -------------------------------------------------------
    # 🧾 Summary section with percentages and explanations
    # -------------------------------------------------------
    total_files = len(summary["matched"]) + len(summary["differences"]) + len(summary["missing"])
    matched_pct = round((len(summary["matched"]) / total_files) * 100, 2) if total_files else 0
    diff_pct = round((len(summary["differences"]) / total_files) * 100, 2) if total_files else 0
    missing_pct = round((len(summary["missing"]) / total_files) * 100, 2) if total_files else 0

    print("\n\n📊 SUMMARY REPORT")
    print("=" * 100)
    print(f"✅ Matched: {len(summary['matched'])} files ({matched_pct}%)")
    for f in summary["matched"]:
        print(f"   - {f}")

    print(f"\n❌ With Differences: {len(summary['differences'])} files ({diff_pct}%)")
    for f in summary["differences"]:
        details = summary["details"][f]
        print(f"   - {f}")
        if details["missing_in_blockly"]:
            print(f"       ⚠️ Classes missing in Blockly: {sorted(details['missing_in_blockly'])}")
        if details["missing_in_ecore"]:
            print(f"       ⚠️ Classes missing in Ecore: {sorted(details['missing_in_ecore'])}")
        if details["missing_rels_in_blockly"]:
            print(f"       🔗 Relationships missing in Blockly: {sorted(details['missing_rels_in_blockly'])}")
        if details["missing_rels_in_ecore"]:
            print(f"       🔗 Relationships missing in Ecore: {sorted(details['missing_rels_in_ecore'])}")

    print(f"\n⚠️ Missing Ecore: {len(summary['missing'])} files ({missing_pct}%)")
    for f in summary["missing"]:
        print(f"   - {f}")

    print("=" * 100)
    print(f"📦 Total Files Processed: {total_files}")
    print(f"📈 Accuracy (Matched vs Total): {matched_pct}%")
    print("=" * 100)

if __name__ == "__main__":
    main()

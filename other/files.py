import os
import random
import shutil
from pathlib import Path

def copy_random_files(source_folder, destination_folder, num_files):
    """
    Copy random files from source folder to destination folder.
    
    Args:
        source_folder (str): Path to source folder
        destination_folder (str): Path to destination folder
        num_files (int): Number of files to copy
        
    Returns:
        list: Names of copied files
    """
    try:
        # Convert to Path objects
        source_path = Path(source_folder)
        dest_path = Path(destination_folder)
        
        # Create destination folder if it doesn't exist
        dest_path.mkdir(parents=True, exist_ok=True)
        
        # Get list of all files in source folder
        all_files = [f for f in source_path.iterdir() if f.is_file()]
        
        # Check if we have enough files
        num_files = min(num_files, len(all_files))
        if num_files == 0:
            print("No files found in source folder")
            return []
        
        # Select random files
        selected_files = random.sample(all_files, num_files)
        
        # Copy each selected file
        copied_files = []
        for file in selected_files:
            shutil.copy2(file, dest_path / file.name)
            copied_files.append(file.name)
            
        return copied_files
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return []
    

def count_files(folder_path):
    """
    Count number of files in a folder.
    
    Args:
        folder_path (str): Path to the folder
        
    Returns:
        int: Number of files in folder
    """
    try:
        # Convert to Path object
        path = Path(folder_path)
        
        # Count only files, not directories
        count = len([1 for item in path.iterdir() if item.is_file()])
        
        return count
        
    except FileNotFoundError:
        print(f"Error: Folder '{folder_path}' not found")
        return 0
    except PermissionError:
        print(f"Error: Permission denied to access '{folder_path}'")
        return 0
    except Exception as e:
        print(f"Error: {str(e)}")
        return 0
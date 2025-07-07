keys_tools = ['arch', 'scala', 'addons', 'php', 'jdk', 'go','gemfile',
         'os','rvm','_linuxpackages''rust', 'r', 'dist','services',
         'android','node_js','language','matrix', 'python','compiler','rust',
         'xcode_workspace', 'osx_image', 'xcode_scheme',
         'xcode_sdk', 'xcode_project','reference', 'lein','r_build_args', 'git',
            'warnings_are_errors', 'cache','r_github_packages','notification','sudo','podfile','licenses',
            'jobs','r_check_args','notifications']

keys_env_list = ['env']

keys_when = ["branches"]

keys_job = ['before_cache', 'deploy', 'after_script','after_failure','opam','script', 
            'before_deploy','stages','after_success','brefore_install', 'before_script',
            'before_install','bundler_args', 'install']

keys_set = set()
keys_set.update(keys_env_list)
keys_set.update(keys_when)
keys_set.update(keys_job)
keys_set.update(keys_tools)


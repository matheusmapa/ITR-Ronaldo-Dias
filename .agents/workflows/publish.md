---
description: Commits all changes, pushes to the main branch, and sends a notification to the ITR channel on ntfy.sh.
---

// turbo-all
# Task: Publish changes and notify

1. Execute the publish script with the desired message and notification:
   `powershell -ExecutionPolicy Bypass -File publish.ps1 -message "{{message}}" -notification "{{notification}}"`

---
description: Commits all changes, pushes to the main branch, and sends a notification to the ITR channel on ntfy.sh.
---

// turbo-all
# Task: Publish changes and notify

1. Execute the publish script (which will block until the user approves on their phone/PC):
   `node publish.js -message "{{message}}" -notification "{{notification}}"`


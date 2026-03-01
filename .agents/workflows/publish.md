---
description: Commits all changes, pushes to the main branch, and sends a notification to the ITR channel on ntfy.sh.
---

// turbo-all
# Task: Publish changes and notify

1. Execute the notification script to ping the user's phone:
   `npm run notify -- -notification "{{notification}}"`
2. Execute the publish script (which will block until the user approves on their phone/PC):
   `npm run push -- -message "{{message}}"`


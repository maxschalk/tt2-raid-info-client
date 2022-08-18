IF [%1]==[] (
    SET CommitMessage="automated: :rocket: force deploy from dev"
) ELSE (
    SET CommitMessage=%1
)

git switch dev

git add .

git commit -am %CommitMessage%

git switch main

git merge dev

git push --all

git switch dev
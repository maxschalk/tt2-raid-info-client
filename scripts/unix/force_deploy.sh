if [ -z "$1" ]
then
    msg="automated: :rocket: force deploy from dev"
else
    msg=$1
fi


git switch dev

git add .

git commit -am "$msg"

git switch main

git merge dev -m "merge branch 'dev'"

git push --all

git switch dev
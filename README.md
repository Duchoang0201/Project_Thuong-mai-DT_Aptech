Project_Thuong-mai-DT_Aptech
Đồ án: "Website thương mại điện tử" - Aptech

Thành viên nhóm 2:

1. Nguyễn Bá Đức Hoàng
2. Phạm Cao Thắng

///WEB_NODEJS_SERVER:

    https://data-server-shop.onrender.com

///WEB_REATJS_ADMIN:

    https://online-web-serveronline.netlify.app

    //main
    https://deploy-admin-website.vercel.app

//WEB_NEXTJS_SHOP:

    https://deploy-shop-website.vercel.app

// MOMO CHECK ACCOUNT:

No Tên Số thẻ Hạn ghi trên thẻ OTP Trường hợp test
1 NGUYEN VAN A 9704 0000 0000 0018 03/07 OTP Thành công
2 NGUYEN VAN A 9704 0000 0000 0026 03/07 OTP Thẻ bị khóa
3 NGUYEN VAN A 9704 0000 0000 0034 03/07 OTP Nguồn tiền không đủ
4 NGUYEN VAN A 9704 0000 0000 0042 03/07 OTP Hạn mức thẻ

// VNPAY CHECK ACCOUNT

Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ: NGUYEN VAN A
Ngày phát hành: 07/15
Mật khẩu OTP: 123456

Sử dụng git: (necessary)

. Create a new Branch from Branch: 'main' ( clone from 'main')

    git checkout -b 'tên nhánh' main

. Check current main and show all branch

    git branch

. Switch branch:

    git checkout 'Branch-name'

. push code from individual branch

    git add .
    git commit -m 'push'
    git push --set-upstream origin 'Branch-name'

. Merge and pull code from 'Main'

    git branch

    git pull

     then --->
        git branch
        git checkout 'Branch-name'
        git pull
        git merge main

. REMOVE

    git rm file1.txt
    git commit -m "remove file1.txt"

. General

    Initialize Git: git init

    Get everything ready to commit: git add .

    Get custom file ready to commit: git add index.html

    Commit changes: git commit -m "Message"

    Commit changes with title and description: git commit -m "Title" -m "Description..."

    Add and commit in one step: git commit -am "Message"

    Remove files from Git: git rm index.html

    Update all changes: git add -u

    Remove file but do not track anymore: git rm --cached index.html

    Move or rename files: git mv index.html dir/index_new.html

    Undo modifications (restore files from latest commited version): git checkout -- index.html

    Restore file from a custom commit (in current branch): git checkout 6eb715d -- index.html

. Update & Delete

    Test-Delete untracked files: git clean -n

    Delete untracked files (not staging): git clean -f

    Unstage (undo adds): git reset HEAD index.html

    Update most recent commit (also update the commit message): git commit --amend -m "New Message"

. Merge

    True merge (fast forward): git merge branchname

    Merge to master (only if fast forward): git merge --ff-only branchname

    Merge to master (force a new commit): git merge --no-ff branchname

    Stop merge (in case of conflicts): git merge --abort

    Stop merge (in case of conflicts): git reset --merge // prior to v1.7.4

    Undo local merge that hasn't been pushed yet: git reset --hard origin/master

    Merge only one specific commit: git cherry-pick 073791e7

    Rebase: git checkout branchname » git rebase master or: git merge master branchname (The rebase moves all of the commits in master onto the tip of branchname.)

    Cancel rebase: git rebase --abort

    Squash multiple commits into one: git rebase -i HEAD~3 (source)

    Squash-merge a feature branch (as one commit): git merge --squash branchname (commit afterwards)

Cart :

\_id: cart

customer :
\_id: 6418ee71695619ee88123bef
firstName: "Nathan "
lastName: "Fay DVM"

cartDetail:[
{productId:
quantity:
CreateD:
}
,
{
productId:
quantity:
},{
productId:
quantity:
}
]

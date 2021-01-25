/***
 * Mini-Reddit Script
 * Author: Kehinde Ojapa
 */


//  Cache DOM Selectors
const main = document.querySelector('#main');
const postForm = document.querySelector('#form-container');
const postMessage = document.querySelector('#post');
const postButton = document.querySelector('.post-btn');


// Auto write Function
let text = document.querySelector('.discuss h3');
let mainText = text.innerHTML;
let indexText = 1;
function autoText() {
    text.innerText = mainText.slice(0, indexText);
    indexText++;
    if(indexText > mainText.length) {
        indexText = 1;
    }
}
setInterval(autoText, 200);


/**
 * Function to get true array form of item. 
 */

function arrayedClassList(e) {
    let item = e.target;
    arrayedItem = Array.from(item.classList);
}


/**
 * Function to create post
 */

 //Hide button until user focus on message field.
 postButton.classList.add('offStatus')
 //Show button open receiving focus
postMessage.addEventListener('focus', e => {
    postButton.classList.remove('offStatus');
    
})


/**
 * Post Function
 */
postForm.addEventListener('submit', e => {
    e.preventDefault();
    let message = postMessage.value;
    if(message.length < 1){
        alert('Post length is invalid')
    } else {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');
        postContainer.classList.add(`${newDiscussions()}`)
        postContainer.innerHTML = `
            <p class="postText">${message}</p>
            <a href="#" class="comment-btn discussBtn">Discuss</a>

            <form action="#" class="form-comment offStatus">
                
                    <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
               
                
                    <button class="comment-btn commentBtn">comment</button>
                
            </form>
        `
        main.prepend(postContainer);
        postMessage.value = '' //reset message
    }
})


/**
*function checks if item is a comment button, 
*and shows the commentBox(toggles).
*/
const openComment = e => {
    arrayedClassList(e);
    if(arrayedItem.includes('discussBtn')){
        let item = e.target;
        let commentBox = item.nextSibling.nextSibling;
        //Show comment Textarea and button
        commentBox.classList.remove('offStatus');
    }
}

/**
 * Function to add comment to the discussion
 */
const addComment = e => {
    arrayedClassList(e);
    if(arrayedItem.includes('commentBtn')){
        let commentBtn = e.target;
        let commentMessage = commentBtn.previousSibling.previousSibling;
        let commentContainer = commentMessage.parentElement.parentElement;
        let commentBox = commentMessage.parentElement;

        //Add comment to the commentContainer(feeds)
        const postComment = document.createElement('div');
        postComment.classList.add('comment-vote');
        postComment.classList.add(`${newComments()}`);
        postComment.innerHTML = `
            <p>${commentMessage.value}</p>
            <div class="vote-buttons">
                <button class="up-vote">UpVote</button>
                <button class="down-vote">DownVote</button>
            </div>
        `
        //Check if comment value isnt empty
        if(commentMessage.value.length > 0){
            commentContainer.append(postComment);
            commentMessage.value = ''
            commentBox.classList.add('offStatus');
        }
        
    }
}

const upDownVote = e => {
    arrayedClassList(e);
    if(arrayedItem.includes('up-vote')) {
        let item = e.target;
        const countItem = document.createElement('div');
        countItem.classList.add('votedUp');
        item.parentElement.append(countItem);
        function getUpVote() {
            let count = 0;
            let children = Array.from(item.parentElement.children);
            children.forEach(child => {
                let arrayChild = Array.from(child.classList);
                if(arrayChild.includes('votedUp')){
                    count++
                }
            })
            return count;
        }
        let count = getUpVote();
        item.innerHTML = `UpVotes(${count})`;
    } else if(arrayedItem.includes('down-vote')) {
        let item = e.target;
        const countItem = document.createElement('div');
        countItem.classList.add('votedDown');
        item.parentElement.append(countItem);
        function getUpVote() {
            let count = 0;
            let children = Array.from(item.parentElement.children);
            children.forEach(child => {
                let arrayChild = Array.from(child.classList);
                if(arrayChild.includes('votedDown')){
                    count++
                }
            })
            return count;
        }
        let count = getUpVote();
        item.innerHTML = `DownVotes(${count})`;
    }
}


/**
 * Arrange comments according to vote.
 * 
 */
const arrangeComment = () => {
    /**
     * TODO
     * - Use sort and compare using comment votedUp and VoteDown
     * - Push it into a new array
     * - Append each item into the postsContainer.
     */
    setInterval(() => {
        let discussComment = [];

        let comments = document.querySelectorAll('.vote-buttons');
        const postsContainer = document.querySelector('post-container');
        
    
        let classA = 'a'
        for(let i = 0; i < newDiscussion.length; i++){
            let getThisComment = document.querySelectorAll(`.${classA} .vote-buttons`);     
            discussComment.push(getThisComment);
            classA = classA + 'a'
        }
        discussCommentArray = Array.from(discussComment);
        discussCommentArray.forEach(discuss => {
            // console.log(discuss)
            Array.from(discuss).forEach(node => {
                let upCount = 0;
                let downCount = 0;
                Array.from(node.childNodes).forEach(childNode => {
                    if(childNode.className == 'votedUp') {
                        upCount++;
                    } else if(childNode.className == 'votedDown') {
                        downCount++;
                    }
                })
                node.totalCount = upCount - downCount;
                // console.log(`${node} ${node.totalCount}`);
            })
        })
        let arr2 = [];
        let arr3 = []
        discussCommentArray.forEach(discuss => {
            // create new array for a certain discussion
            // to take the place of arr2.
            let arr = createNewArray();
            // console.log(arr);
            arr = [];

            discuss.forEach(comment => {
                // console.log(comment.parentElement.innerHTML);
                // comment.parentElement.isContentEditable = true;
                arr.push(comment.parentElement);
                arr.sort((a,b) => b.lastElementChild.totalCount - 
                a.lastElementChild.totalCount);
                // console.log(arr)
                // arr.push(comment);
                // arr.sort((a,b)=> b.totalCount - a.totalCount);
            })
            arr2.push(arr);
            // console.log(arr2);
            let sortComment = [];
            classA = 'a'
            for(let i = 0; i < newComment.length; i++){
                let getAllComment = document.querySelector(`.${classA}`);     
                sortComment.push(getAllComment);
                classA = classA + 'a';
            }
                let i = 0;
                let j = 0;
            console.log(arr2[i][j])
            sortComment.forEach(comment => {
                Array.from(comment.children).forEach(node => {
                    if(node.classList.contains('comment-vote')){
                        node.innerHTML = '';
                    for(let j = 0; j < arr2[i].length; j++){
                        const newComment = document.createElement('div');
                        newComment.classList.add('comment-vote');
                        newComment.innerHTML = arr[i][j].innerHTML;
                        comment.appendChild(newComment);
                    }
                }
                i++;
            //     // arr2.forEach(comments => {
            //     //     comments.forEach(commentItem => {
            //     //         // const newComment = document.createElement('div');
            //     //         // newComment.classList.add('comment-vote');
            //     //         // newComment.innerHTML = commentItem.innerHTML;
            //     //         // comment.appendChild(newComment);
            //     //         // console.log(arr2);
            //     //         // console.log(commentItem.innerHTML);
            //     //     })
            //     // })
            })
            
                
            })
        })
        // console.log(arr2);
    }, 10000);  
}

arrangeComment();

// getComment;
main.addEventListener('click', openComment);
main.addEventListener('click', addComment);
main.addEventListener('click', upDownVote);

let newDiscussion = '';
let newComment = '';
let newArray = '';
function newDiscussions(){
    newDiscussion = newDiscussion + 'a'
    return newDiscussion;
}
function createNewArray(){
    newArray = newArray + 'r';
    return newArray;
}
function newComments(){
    newComment = newComment + 'c';
    return newComment;
}

// var numbers = [-4, 2, 5, 17, 3];
// numbers.sort(function(a, b) {
//   return b - a;
// });
// console.log(numbers);


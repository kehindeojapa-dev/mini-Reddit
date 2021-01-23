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
        let sortedComment = [];
        
        let upVotes = document.querySelectorAll('.vote-buttons .votedUp');
        let downVotes = document.querySelectorAll('vote-button .votedDown');
        let comments = document.querySelectorAll('.vote-buttons');
        const postsContainer = document.querySelector('post-container');
        commentsArray = Array.from(comments);
        commentsArray.forEach(comment => {
            let upCount = 0;
            let downCount = 0;
             Array.from(comment.childNodes).forEach(node =>{
                 if(node.className == 'votedUp'){
                     upCount++;
                 } else if(node.className == 'votedDown') {
                     downCount++;
                 }
             })
            //  console.log(upCount-downCount);
        })
       
        // console.log(comments);
        // console.log(newDiscussion);
        let classA = 'a'
        for(let i = 0; i < newDiscussion.length; i++){
            let getThisComment = document.querySelectorAll(`.${classA} .vote-buttons`);     
            sortedComment.push(getThisComment);
            classA = classA + 'a'
        }
        console.log(sortedComment);
    }, 2000);
}

arrangeComment();

// getComment;
main.addEventListener('click', openComment);
main.addEventListener('click', addComment);
main.addEventListener('click', upDownVote);

let newDiscussion = '';
let newComment = '';

function newDiscussions(){
    newDiscussion = newDiscussion + 'a'
    return newDiscussion;
}
function newComments(){
    newComment = newComment + 'c';
    return newComment;
}

var numbers = [-4, 2, 5, 17, 3];
numbers.sort(function(a, b) {
  return b - a;
});
console.log(numbers);
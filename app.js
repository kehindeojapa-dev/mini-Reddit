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
                
                    <textarea name="comment" id="comment"></textarea>
               
                
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
        postComment.innerHTML = `
            <p>${commentMessage.value}</p>
            <div class="vote-buttons">
                <button class="up-vote">UpVote</button>
                <button class="down-vote">DownVote</button>
            </div>
        `
        //Check if comment value isnt empty before posting is allowed
        if(commentMessage.value.length > 0){
            commentContainer.append(postComment);
            commentMessage.value = ''
            commentBox.classList.add('offStatus');
        }
        
    }
}


/**
 * Function to increase value of upvote and downvote of a button.
 */
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
 * Arrange comments of a discussion according to vote.
 * runs every 10s
 */
const arrangeComment = () => {
    
    setInterval(() => {
        let discussComment = []; //get each discussions
    
        let classA = 'a' 
        for(let i = 0; i < newDiscussion.length; i++){
            let getThisComment = document.querySelectorAll(`.${classA} .vote-buttons`);     
            discussComment.push(getThisComment);
            classA = classA + 'a'
        }

        //Get a proper array form of the discussions container.
        discussCommentArray = Array.from(discussComment);

        // For each comment in a discussion, it gets the upVote
        // count and downCount count and give the comment a totalCount;
        discussCommentArray.forEach(discuss => {
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
            })
        })


        let discussions = []; //container for discussions 
        // with modified comment voteCount
        classA = 'a'
        for(let i = 0; i < newDiscussion.length; i++){
            let getAllComment = document.querySelectorAll(`.${classA}`); 
            Array.from(getAllComment).forEach(discussion => {
                discussions.push(discussion);
            })    
            classA = classA + 'a';
        }


        let arr = [];
        let eachDissComments = [];
        //Loop to get comments for each discussion
        discussions.forEach(nodes => {
            Array.from(nodes.children).forEach(node => {
                if(node.classList.contains('comment-vote')){
                    arr.push(node);
                }
            })
            eachDissComments.push(arr);
            arr = [];
        })
        
        // Sort discussion comments according to totalCount
        eachDissComments.forEach(discuss => {
            discuss.sort((a,b) => b.lastElementChild.totalCount - a.lastElementChild.totalCount);
        })


        /**
         * Loop to go through each discussion and add the
         * modified comment(arranged according to their votes).
         */
        for(let i = 0; i < discussions.length; i++) {
            Array.from(discussions[i].children).forEach(node => {
                if(node.classList.contains('comment-vote')){
                    node.remove();
                }
            })
            eachDissComments[i].forEach(comment => {
                const newComment = document.createElement('div');
                newComment.classList.add('comment-vote');
                newComment.innerHTML = comment.innerHTML;
                discussions[i].appendChild(newComment);
            })                
        }

        //Reset the modified comment container.
        eachDissComments = [];
    }, 10000);  
}

// Function runs every 10s.
arrangeComment();


/**
 * Below functions is to generate 'a' and 'a' to it
 * everytime it is run
 */
let newDiscussion = '';
function newDiscussions(){
    newDiscussion = newDiscussion + 'a'
    return newDiscussion;
}

/**
 * MAIN EVENT-LISTENERS
 */
main.addEventListener('click', openComment);
main.addEventListener('click', addComment);
main.addEventListener('click', upDownVote);




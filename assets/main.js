let addBtn = document.getElementById('add_btn');
        addBtn.addEventListener('click', addChapter);
        let parentList = document.getElementById('parentList');
        function addChapter(e) {
            if(parentList.children[0].className == 'emptyMsg'){
                parentList.children[0].remove();
            }
            let currentBtn = e.currentTarget;
            let currentInput = currentBtn.previousElementSibling;   
            let currentChapter = currentInput.value;

            let newLi = document.createElement("li");
            newLi.className = "list-group-item d-flex justify-content-between";
            newLi.innerHTML = `<h3 class="flex-grow-1">${currentChapter}</h3>
                    <button class="btn btn-warning mx-4" onclick="editChapter(this)">Edit</button>
                    <button class="btn btn-danger" onclick="removeChapter(this)">Remove</button>`

            parentList.appendChild(newLi);         
        }

        function removeChapter(currElement) {
            currElement.parentElement.remove();
            if(parentList.children.length <= 0) {
                let newEmptyMsg = document.createElement("h3");
                newEmptyMsg.classList.add("emptyMsg");
                newEmptyMsg.textContent = "Nothing is here. Please Add a Task"
                parentList.appendChild(newEmptyMsg); 
            }
        }

        function editChapter(currElement) {
            if(currElement.textContent == "Done"){
                currElement.textContent = "Edit"
                let currChapterName = currElement.previousElementSibling.value;
                let currHeading = document.createElement("h3");
                currHeading.className = "flex-grow-1";
                currHeading.textContent = currChapterName;
                currElement.parentElement.replaceChild(currHeading, currElement.previousElementSibling);
            }
            else{
                currElement.textContent = "Done"
                let currChapterName = currElement.previousElementSibling.textContent;
                let currInput = document.createElement("input");
                currInput.type = "text";
                currInput.placeholder = "Add a task...";
                currInput.className = "form-control";
                currInput.value = currChapterName;

                currElement.parentElement.replaceChild(currInput, currElement.previousElementSibling);
            }
        }

let add_text = document.getElementById("input_text");
        add_text.addEventListener('keyup',my_own_function);
        
        function my_own_function(e) {
            if (e.keyCode ==32) {
                current_text=e.currentTarget.value
                word_prediction=send_msg_web(e,current_text)
                console.log("hello!"+word_prediction)
            }
            
        }

        function send_msg_web(e,current_text) {
            e.ajax({
                url: '/get_end_predictions',
                type: "post",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "input_text": current_text,
                    "top_k": 5,
                })
            }).done(function (jsondata, textStatus, jqXHR) {
                console.log(jsondata['bert'])}
        }
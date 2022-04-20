// 1) 유저가 값을 입력한다
// 2) 버튼 클릭 > 할일 추가
// 3) DELETE 클릭 > 할일 삭제
// 4) CHECK 클릭 > 할일 종료(F > T), 중간 줄 그어짐
// 5) 각 메뉴 > 언더바 이동
// 6) ALL / TO-DO / END 마다 아이템 분류 달라짐
// 7) 전체탭을 누름녀 다시 전체아이템으로 돌아옴

// 할일 입력
let userInput = document.getElementById("userIn");
// 클릭 버튼
let addButton = document.getElementById("addBtn");
// 각 메뉴 
let tabs = document.querySelectorAll(".userTabs div");

// 할일 목록(=array)
let userDoList = [];

let mode = "";
let filterList = [];

// 버튼 클릭 이벤트
addButton.addEventListener("click",addDo);

// 클릭 이벤트(div #under-line 제외)
for(let i=1; i<tabs.length;i++){
  tabs[i].addEventListener("click",function(event){filter(event)})

}

// 함수 생성
// 자동 아이디 생성 return Math.random().toString(36).substr(2, 16);

function addDo(){
  let userDo = {
    id : randomIDGenerate(),
    userContent : userInput.value,
    isComplete : false
  };
  userDoList.push(userDo);
  console.log(userDoList);
  render();
}
// UI 업데이트 함수
function render(){
  let list = [];
  if(mode == "all"){
    list = userDoList;
  }else if(mode == "ongoing" || mode == "done"){
    list = filterList;
  }
  let resultHTML = "";
  for(let i=0; i<list.length; i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="userDo">
      <div class="userDone">${list[i].userContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">CHECK</button>
        <button onclick="deleteBtn('${list[i].id}')">DELETE</button>
      </div>
    </div>`;
    }else{
      resultHTML += 
      `<div class="userDo">
        <div>${list[i].userContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">CHECK</button>
          <button onclick="deleteBtn('${list[i].id}')">DELETE</button>
        </div>
      </div>`;
    }

  }

  document.getElementById("userBoard").innerHTML = resultHTML;
}

// CHECK 버튼 클릭 이벤트 함수(버튼에 바로 함수 호출)
function toggleComplete(id){
  for(let i=0; i<userDoList.length; i++){
    if(userDoList[i].id == id){
      // isComplete : T < > F
      userDoList[i].isComplete = !userDoList[i].isComplete;
      break;
    }
  }
  render();
}

// 배열 삭제 > splice
function deleteBtn(id){
  for(let i=0; i<userDoList.length; i++){
    if(userDoList[i].id == id){
      userDoList.splice(i,1)
      break;
    }
  }
  render();
}

// 랜덤 아이디 생성 return '_' + Math.random().toString(36).substr(2, 9);
function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function filter(event){
  mode = event.target.id;
  filterList = [];

  document.getElementById("underLine").style.width =
  event.target.offsetWidth + "px";
  document.getElementById("underLine").style.top =
  event.target.offsetWidth + event.target.offsetWidth + "px";
  document.getElementById("underLine").style.left =
  event.target.offsetWidth + "px";
  if(mode == "all"){
    render();
  }else if(mode == "ongoing"){
    for(let i=0; i<userDoList.length; i++){
      if(userDoList[i].isComplete == false){
        filterList.push(userDoList[i]);
      }
    }
    render();
  }else if(mode == "done"){
    for(let i=0; i<userDoList.length;i++){
      if(userDoList[i].isComplete == true){
        filterList.push(userDoList[i])
      }
    }
    render();
  }
}
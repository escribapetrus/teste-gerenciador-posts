var posts = new Array()
//LOAD POSTS INTO TABLE
$.ajax({url: "https://my-json-server.typicode.com/typicode/demo/posts", method: "GET", success: function(results){
    results.forEach(function(result){
        var date = dateBr();
        var status = "Sim"
        var post = new Post (result.id, result.title, date, status)
    });
}});
// ADD NEW POST TO TABLE
$("#form").submit(function(event) {
    event.preventDefault();
    var id = Number($("#idPost").val());
    var title = $("#titlePost").val();
    var date = new Date($("#data").val());
    if ($("form input:checkbox").is(":checked")){
         var status = "Sim"
    } else {
        var status = "Não";
    }
    $("#form").validate();
// CHECK IF id ALREADY EXISTS, IF YES, BLOCK ENTRY    
    if (postExists(posts, id)){
        $(".error-ja-existe").show()
        console.log("error")
    } else {
        $(".error-ja-existe").hide()
        var post = new Post(id, title, date, status);
    }     
});
//APPLY SELECTED TO ROW
$("tbody").on("click", "tr", function(){
  $(this).toggleClass("selected");
});
//ERASE SELECTED
$("#btnApagar").on("click", erase);
//FUNCTIONS
function Post(id, title, date, status){
    this.id = id;
    this.title = title;
    this.date = dateBr();
    this.status = status
    posts.push(this)
    var entry = '<td class="id">' + this.id + '</td><td>' + this.title + '</td><td>' + this.date + '</td><td>' + this.status + '</td>';
    var row = '<tr class="postRow">' + entry + '</tr>'
    $('tbody').append(row); 
}
function postExists(posts, id) {
    return posts.some(function(post){
        return post.id == id;
    });
};
function erase(){
    var selected = $(".selected");
    if (selected.length == 0) {
        $(".error-apagar").show()
    } else {
        $(".error-apagar").hide()
        for (num of selected){
            var id = Number(num.firstChild.innerText);
            for (var i = 0; i < posts.length; i++) {
                console.log(posts[i].id, id);
                if(posts[i].id === id){
                    posts.splice(i,1);
                    selected.remove();
                } else {
                }
            }
        };
    }
}        

function dateBr(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
}
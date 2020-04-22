// window.onload = function(){
//   this.builtformio()
// }
function builtformio(){
  let builderSchema;
  Formio.builder(document.getElementById('builder'), {
      display: 'form',
      components: [],
    }, {
    }).then(function(builder) {
      builder.on('saveComponent', function() {
        builderSchema = builder.schema;
      });
  });
  var submitSchema = document.getElementById("submitSchema");
  submitSchema.addEventListener("click", function(){
    console.log(JSON.stringify(builderSchema.components));
    var status;
    if (confirm("Are you sure?") == true) {
        // call api and save database json
        localStorage.setItem("dataSchemaForm", JSON.stringify(builderSchema.components));
        status = "You pressed OK!";
    } else {
        status = "You pressed Cancel!";
    }
    console.log(status);
  });
}



function builtformio(){
  console.log('Render built form io');
  let builderSchema = [];
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
    localStorage.setItem("builderSchema", JSON.stringify(builderSchema));
    if(builderSchema.length === 0){
      document.getElementById("errorNoComponent").style.display = "block";
    }else{
      document.getElementById("errorNoComponent").style.display = "none";
    }
  });
}


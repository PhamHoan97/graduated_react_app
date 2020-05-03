function displayForm (jsonShema,isRead){
   //console.log('Display form')
   Formio.createForm(
      document.getElementById("formio"),
      {
         components: jsonShema,
      },
      {
         readOnly: isRead,
         zoom: "-20",
         // renderMode:'html'
      }
   ).then(function (form) {
      form.nosubmit = true;
      form.on("submit", function (submission) {
         localStorage.setItem('dataForm',JSON.stringify(submission));
         document.getElementById('sendDatabase').click();
      });
   });
}

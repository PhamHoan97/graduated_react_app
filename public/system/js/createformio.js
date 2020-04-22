var jsonShema =[
   {
      "label":"Text Field",
      "spellcheck":true,
      "tableView":true,
      "calculateServer":false,
      "key":"textField",
      "type":"textfield",
      "input":true
   },
   {
      "label":"Columns",
      "columns":[
         {
            "components":[
               {
                  "label":"Text Field",
                  "spellcheck":true,
                  "tableView":true,
                  "calculateServer":false,
                  "key":"textField2",
                  "type":"textfield",
                  "input":true,
                  "hideOnChildrenHidden":false
               },
               {
                  "label":"Text Field",
                  "spellcheck":true,
                  "tableView":true,
                  "calculateServer":false,
                  "key":"textField4",
                  "type":"textfield",
                  "input":true,
                  "hideOnChildrenHidden":false
               }
            ],
            "width":6,
            "offset":0,
            "push":0,
            "pull":0
         },
         {
            "components":[
               {
                  "label":"Text Field",
                  "spellcheck":true,
                  "tableView":true,
                  "calculateServer":false,
                  "key":"textField3",
                  "type":"textfield",
                  "input":true,
                  "hideOnChildrenHidden":false
               },
               {
                  "label":"Text Field",
                  "spellcheck":true,
                  "tableView":true,
                  "calculateServer":false,
                  "key":"textField5",
                  "type":"textfield",
                  "input":true,
                  "hideOnChildrenHidden":false
               }
            ],
            "width":6,
            "offset":0,
            "push":0,
            "pull":0
         }
      ],
      "tableView":false,
      "key":"columns",
      "type":"columns",
      "input":false
   },
   {
      "label":"Email",
      "spellcheck":true,
      "tableView":true,
      "calculateServer":false,
      "key":"email1",
      "type":"email",
      "input":true
   },
   {
      "label":"Email",
      "spellcheck":true,
      "tableView":true,
      "calculateServer":false,
      "key":"email",
      "type":"email",
      "input":true
   },
   {
      "label":"Text Field",
      "spellcheck":true,
      "tableView":true,
      "calculateServer":false,
      "key":"textField1",
      "type":"textfield",
      "input":true
   },
   {
      "label":"Signature",
      "tableView":false,
      "calculateServer":false,
      "key":"signature",
      "type":"signature",
      "input":true
   },
   {
      "type":"button",
      "label":"Submit",
      "key":"submit",
      "disableOnInvalid":true,
      "input":true,
      "tableView":false
   }
];

Formio.createForm(document.getElementById('formio'), {
    components: jsonShema
},{
  readOnly: true,
  zoom: '-20'
}).then(function(form) {
  form.nosubmit = true;
});

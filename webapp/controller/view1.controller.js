sap.ui.define([
    'cgi/hr/userdata/controller/BaseController',
    'sap/m/MessageToast',
    'cgi/hr/userdata/util/formatter',
	"sap/gantt/control/Cell"
], function(Controller,
	MessageToast,
	formatter,
	Cell) {
    'use strict';
        return Controller.extend("cgi.hr.userdata.controller.view1",{
            formatter : formatter,
            onInit:function(){
                this.oRouter = this.getOwnerComponent().getRouter();
                var oLocalModel= new sap.ui.model.json.JSONModel( );
                oLocalModel.setData(
                    {
                       "student" : {
                           "sname" : "",
                           "smarks": "" ,
                           "sid": "" ,
                           "sclass": "Foruth" ,
                          "ssection" : "" ,      
                        "studentMarks":{
                            "english" : "",
                            "hindi" : "",  
                            "kannada" : "" 
                        }                         
                        }                                    
                        }
                    
                    );
                var oLocalModel1= new sap.ui.model.json.JSONModel( );
                oLocalModel1.setData({
                        "studentDetails" : []
                });
                var oEmployeeModel = new sap.ui.model.json.JSONModel();
                oEmployeeModel.setData({
                    "employees": [
                    {
                      "empName" :  "Madhavi",
                      "empAddress" : "B.T.M. Layout",
                      "empMobile" : "8880568995"
                    },
                    {
                        "empName" :  "Neelima",
                        "empAddress" : "B.T.M. Layout",
                        "empMobile" : "9916222975"
                      },
                    {
                        "empName" :  "Taruni",
                        "empAddress" : "B.T.M. Layout",
                        "empMobile" : "8970568995"
                      },
                ]

                });
                this.getView().setModel(oEmployeeModel,"oEmployeeModel");
              //  var oresult = this.getView().getModel("oEmployeeModel").getData();
              //  this.getView().getModel("oEmployeeModel").setData({ employees : oresult});
                this.getView().setModel(oLocalModel1, "studenttableModel"); 
                this.getView().setModel(oLocalModel, "studentModel"); 
                var editableModel = new sap.ui.model.json.JSONModel();
                editableModel.setData({
                    "editable": false,
                    "add":true,
                    "edit":true,
                    "delete":true
                });
                this.getView().setModel(editableModel,"editableModel");
                },
            onEmployeesSelect:function(oEvent)
            {
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                this.getView().byId("idEmployeeSimpleForm").bindElement(sPath);
            },
            onUpdateStudent:function(){ 
                var sPath = this.getView().byId("idEmployeeSimpleForm").getBindingContextPath();
                var sObj  = sPath.getObject();
                this.getView().getModel().setProperty(sPath, sObj);
            },
            onTotalScore:function(){
                var aRows = this.getView().getModel().getData().UserSet;
                let sum = aRows.reduce(function(accumulator,el) {
                    return accumulator + parseFloat(el.score);
                },0);
                console.log(sum);
                var oTable = this.getView().byId("userData");
                var aRows = oTable.getModel().getData().UserSet;
                //for(let i in aRows){
                //    if(aRows[i].score === 2)
                //    oTable.getRows()[i]
                    //aRows[i].$().addStyleClass("sapUiTinyMargin");
                }

            },
            onCreateStudent:function(){
                var sname = this.getView().byId("sname").getValue();
                var smarks = this.getView().byId("smarks").getValue();
                var sid = this.getView().byId("sid").getValue();
                var sclass = this.getView().byId("sclass").getValue();
                var ssection = this.getView().byId("ssection").getValue();
                var sobj = {
                    "sname" : sname,
                    "smarks" : smarks,
                    "sid" : sid,
                    "sclass" : sclass,
                    "ssection" : ssection
                }
                var sobj1 = this.getView().getModel("studentModel").getProperty('/student') ;
                var aRows = this.getView().getModel("studenttableModel").getProperty('/studentDetails');
                aRows.push(sobj1);
                this.getView().getModel("studenttableModel").setData( { studentDetails : aRows });
                
                      },
      
            onCreate:function(){
                var oTable = this.getView().byId("userData");
                var aRows = oTable.getModel().getData().UserSet;
                var obj={
                    "id":"",
                    "name":"",
                    "email":"",
                    "mobile":"",
                    "editable":true
                }
                aRows.push(obj);
                oTable.getModel().setData({UserSet : aRows});
                this.getView().getModel("editableModel").setProperty("/editable", true);
                this.getView().getModel("editableModel").setProperty("/add", false);
                this.getView().getModel("editableModel").setProperty("/edit", false);
                //this.oRouter.navTo("userdatacr");
            },
            userId:'',
            ind:'',
            userSelectionChange: function(oEvent){
                // var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                // this.userId = sPath.split("/")[sPath.split("/").length - 1];
                // var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                // var oTable = this.getView().byId("userData");
                // this.ind = oTable.indexOfItem(oTable.getSelectedItem());  
                
            },
            oldDataArray:'',
            onUpdate:function(){
            //   this.oRouter.navTo("userdataupd",
            //  { ind : this.ind });  
            //   var oTable = this.getView().byId("userData");
            //   var aResultRows = [];
            //   var aNewRows = oTable.getModel().getData().UserSet;
            //   var aRows = this.getView().getModel().getProperty("/aRows");
            //   if(this.aRows.length == aNewRows.length){
            //     for(var i = 1;i < aNewRows.length;i++){
            //         if(JSON.stringify(this.aRows[i]) !== JSON.stringify(aNewRows[i]))
            //         { aResultRows.push(aNewRows[i]); }
            //     }
            //   }
                this.oldDataArray  = [];
                var that = this;
                var oTable = this.getView().byId("userData");
                var selArray = oTable.getSelectedContexts();
                if (selArray.length === 0){
                    MessageToast.show("Select rows to edit");
                    return;
                }
                else
                {
                    this.getView().getModel("editableModel").setProperty("/editable", true);
                    selArray.forEach(function(item){
                    var selContext = item;
                    var selPath = selContext.getPath();
                    var selObj  = selContext.getObject();   
                    var oldObj = {
                        sPath : selPath,
                        sObj  : selObj
                    }
                    that.oldDataArray.push(oldObj);
                    selObj.editable = true;
                    that.getView().getModel().setProperty(selPath, selObj, selContext, true);
                    }

                    );
                    this.getView().getModel("editableModel").setProperty("/edit", false);
                    this.getView().getModel("editableModel").setProperty("/add", false);                
                }
            },
            onSave:function(oEvent){
                var that = this;
                var oTable = this.getView().byId("userData");
                var selArray = oTable.getSelectedContexts();
                if (selArray.length === 0){
                    MessageToast.show("select an item to save");
                    return;
                }
                else {
                    selArray.forEach(function(item){
                    let regEx = /^[0-9]{1-9}/;
                    let test = regEx.test(item.mobile);
                    if (test === true){    
                    MessageToast.show("Enter mobile number correctly");
                    return;
                    }
                    });
                    
                }
                   selArray.forEach(function(item){
                   var sContext = item;
                   var sPath = item.getPath();
                   var sObj  = item.getObject();
                   sObj.editable = false;
                   that.getView().getModel().setProperty(sPath, sObj, sContext);
                });
                this.getView().getModel("editableModel").setProperty("/editable", false);
                this.getView().getModel("editableModel").setProperty("/add", true);
                this.getView().getModel("editableModel").setProperty("/edit", true);
                    
            },
            onDelete:function(oEvent){
                // var oTable = this.getView().byId("userData");
                // var aRows = oTable.getModel().getData().UserSet;
                // var ind = oTable.indexOfItem(oTable.getSelectedItem());
                // aRows.splice(ind,1);
                // oTable.getModel().setData({ UserSet : aRows });
                   var oTable = this.getView().byId("userData");
                   var aRows = oTable.getModel().getData().UserSet;
                   var selArray = oTable.getSelectedContexts();
                   for(var i=0;i<selArray.length;i++){
                    var thisObj = selArray[i].getObject();
                    var index = aRows.findIndex(function(sObj){
                        if (JSON.stringify(thisObj) ===JSON.stringify(sObj)) {
                            return thisObj;
                            
                        }
                    });
                    aRows.splice(index, 1);
                   }
                   oTable.getModel().setData({ UserSet: aRows});
                   oTable.removeSelections(true);
            },
            
            onBeforeRendering:function(){
                //$(".avengers").css("background-color", "black");
                var oTable = this.getView().byId("userData");
                var aRows = oTable.getModel().getData().UserSet;
                
            },
            onAfterRendering:function(){
            
            },
            onNextScreen:function(){
                this.oRouter.navTo("userdatacr");
            },
            status: function(score){
                switch(score){
                case 1 :
                    return "In Progress";
                case 2 :
                    return "New";
                case 3 :
                    return "Pending";
                default:
                    return "not valid";    
                }
            }



});
    
});
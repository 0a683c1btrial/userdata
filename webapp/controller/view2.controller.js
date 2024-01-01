sap.ui.define([
    'cgi/hr/userdata/controller/BaseController',
    'sap/ui/core/routing/History',
    'sap/m/MessageBox'
], function (Controller, History, MessageBox) {
    'use strict';
    return Controller.extend("cgi.hr.userdata.controller.view2", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("userdatacr").attachMatched(this.herculis, this);
            var oQuestionModel = new sap.ui.model.json.JSONModel({
            "QuestionSet":[{
            "Question": "How will you rate the satisfaction with the quality of service provided by techippo?",
            "Type": "Select",
            "Options": [{
            "option": "Neutral"
            }, {
            "option": "Somewhat satisfied"
            }, {
            "option": "Very satisfied"
            }],
            "Answer": ""
            }, {
            "Question": "Please explain the above rating?",
            "Type": "Input",
            "Options": [],
            "Answer": ""
            }, {
            "Question": "How techippo is compared to other service providers of same category?",
            "Type": "Select",
            "Options": [{
            "option": "Not as good"
            }, {
            "option": "About the same"
            }, {
            "option": "Very satisfied"
            }],
            "Answer": ""
            }, {
            "Question": "How likely you would recommend techippo to your friends?",
            "Type": "Radio",
            "Options": [{
            "option": "Definitely not"
            }, {
            "option": "Probably would"
            }, {
            "option": "Definitely would"
            }],
            "Answer": ""

            }, {
            "Question": "How long you been known about techippo?",
            "Type": "Radio",
            "Options": [{
            "option": "Less than a year"
            }, {
            "option": "Dont know"
            }],
            "Answer": ""
            }, {
            "Question": "Thank you for your support",
            "Type": "",
            "Options": [],
            "Answer": "techippo"
            }]
            });
        this.getView().setModel(oQuestionModel);
    },
       
 
        herculis: function () {
        },
        onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.oRouter.navTo("userdata", {}, true /*no history*/);
			}
		},
        factoryList: function(sId,oContext){
            var oUIControl = null;
            var oList = this.getView().byId(sId);
            var questionType = oContext.getProperty("Type");
            switch(questionType){
                case "Select" :
                oUIControl = new sap.m.CustomListItem({
                content: [
                    new sap.m.VBox({                
                        items:[
                            new sap.m.Text({ text:"{Question}"}),
                            new sap.m.Select({ 
                                selectItemId :"{Answer}",
                                items: { path: "Options",
                                template: new sap.ui.core.ListItem({
                                  text:"{option}"
                                })
                               }
                            }) 
                        ]
                        }).addStyleClass("sapUiTinyMargin")
                 ] 
                }).addStyleClass("sapUiTinyMargin");
                break;
                case "Radio" :
                oUIControl = new sap.m.CustomListItem({
                    content:[
                     new sap.m.VBox({
                     items: [
                      new sap.m.Text({ text :"{Question}"}),
                      new sap.m.RadioButtonGroup({
                        buttons :{
                         path: "Options",
                         template: new sap.m.RadioButton({
                         text: "{option}"   
                         }) 
                       }
                      })
                     ]
                     }).addStyleClass("sapUiTinyMargin")
                    ]
                }).addStyleClass("sapUiTinyMargin");
                break;
                case "Input" :
                oUIControl = new sap.m.CustomListItem({
                    content: [
                      new sap.m.VBox({
                        items:[
                            new sap.m.Text({ text:"{Question}"}),
                            new sap.m.Input({ value :"{Answer}" })
                        ]
                      }).addStyleClass("sapUiTinyMargin")
                    ]
                }).addStyleClass("sapUiTinyMargin"); 
                break;
                default: 
                oUIControl = new sap.m.StandardListItem({ 
                 title:"{Question}" , description:"{Answer}"   
                }).addStyleClass("sapUiTinyMargin"); 
            }
            return oUIControl;
        },
        onSave: function () {
            var id = this.getView().byId("id").getValue();
            var name = this.getView().byId("name").getValue();
            var email = this.getView().byId("email").getValue();
            var mobile = this.getView().byId("mobile").getValue();
            var userObj = {
                id: id,
                name: name,
                email: email,
                mobile: mobile
            };
            var aRows = this.getView().getModel().getData().UserSet;
            aRows.push(userObj);
            this.getView().getModel().setData({ UserSet : aRows });
            this.oRouter.navTo("userdata");

        /*  var oModel = this.getView().getModel();
            oModel.create("/UserSet", userObj,
                {
                    success: function (oData, oResponse) {
                        var message = "Database table updated successfully";
                        sap.m.MessageBox.show(message, {
                            icon: sap.m.MessageBox.icon.SUCCESS,
                            title: "Record created successfully",
                            actions: [sap.m.MessageBox.Action.OK]
                        });
                    },
                    error: function(oError)
                    {
                        alert('There is some problem');
                    }

                }); */
            }
    });

});
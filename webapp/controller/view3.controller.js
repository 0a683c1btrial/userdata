sap.ui.define([
    'cgi/hr/userdata/controller/BaseController'
], function(Controller) {
    'use strict';
        return Controller.extend("cgi.hr.userdata.controller.view3",{

            onInit:function(){
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("userdataupd").attachMatched(this.herculis, this);
            },
            userId:'',
            ind:'',
            herculis:function(oEvent){
                this.ind = oEvent.getParameter("arguments").ind;
                var sPath = '/UserSet/' + this.ind;
                this.getView().bindElement(sPath);
            },
            onSave:function(oEvent){
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
            aRows[this.ind] = userObj;
            this.getView().getModel().setData({ UserSet : aRows });
            this.getView().getModel().setProperty("/UserSet", aRows);
            this.oRouter.navTo("userdata");

        /*    oModel.update("/UserSet('"+this.userId +"')", userObj,
                {
                    success: function (oData, oResponse) {
                        var message = "Database table updated successfully";
                        sap.m.MessageBox.show(message, {
                            icon: sap.m.MessageBox.icon.SUCCESS,
                            title: "Record updated successfully",
                            actions: [sap.m.MessageBox.Action.OK]
                        });
                    },
                    error: function(oError)
                    {
                        alert(oError);
                        alert('There is some problem');
                    }

                }); */
            } 
                    
});
    
});
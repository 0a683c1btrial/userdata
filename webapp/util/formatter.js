sap.ui.define([]
    
    ,function(){
        return {
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
        };
    
    
    });
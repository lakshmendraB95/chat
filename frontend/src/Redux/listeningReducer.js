import {  SWITCHLISTENING} from "./listeningType";

 const initialListeningState = {
    condition:false,
}

export const listeningReducer = (state = initialListeningState,action) =>{
    switch (action.type) {
        case SWITCHLISTENING:
          return {
            condition:true
          };
        default:
            {
                return state;
            }
        }
}


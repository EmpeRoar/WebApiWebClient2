import { Pipe } from '@angular/core';

@Pipe({ name:'filter' })
export class FilterArrayPipe{
    transform(value, args){

        

        if(!args){
            return value;
        }else if(value){
            return value.filter(item =>{
                for(let key in item){
                    if((typeof item[key].FullName === 'string' || item[key].FullName instanceof String) && 
                        (item[key].indexOf(args)!==-1)){
                        return true;
                    }
                }
            });
        }
    }
}
//import express
const express = require('express');

//import database object
const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findById,
 findSteps,
 add,
 update,
 remove    
};

function find(){
    return db('schemes'); //select all from schemes
}

function findById(id){
    return db('schemes')
    //this is saying where id = id. could write instead {'schemes.id': id} which means where the id in the schemes 
    //table is eqqual to the id entered
    .where({'schemes.id': id}) 
    .first();
}

function findSteps(id){
    return db('schemes')
    .join('steps', 'schemes.id', '=','steps.scheme_id',   )//join tables schemes and steps on both id fields
    .where({ 'schemes.id': id }) //where the id in the schemes table is equal to the id entered
    //the fields to display in the results
    //display these field names in the results
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy( 'steps.step_number' ); //order the steps in chronological order
}

function add(scheme){
    return db('schemes')
    //'id' tells the database to retun the id after it inserts the record 
    //important for postgres
    .insert(scheme, 'id')
    .then( ([id]) => { //insert returns id of the newly inserted row
        return findById(id); //must use return to return the newly added record
    })
    .catch(error => {
        console.log("insert error", error);
    })
}

function update(changes, id){
    return db('schemes')
    .where('id', id)//where the id in the schemes table is equal to the id that was entered
    .update(changes)
    .then( count => {
        return count > 0 ? findById(id) : null;   //must use return to return the newly updated record   
    })

}

function remove(id){

    const record = {};

    return db('schemes')
    .where('id', id)//where the id in the schemes table is equal to the id that was entered    
    .delete()  
    .then( count => {
        //return count > 0 ? findById(id) : null;  
        return count > 0 ? count : null;    
    })

}







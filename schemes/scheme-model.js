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
    .where({ id })
    .first();
}

function findSteps(id){
    return db('steps')
    .where({ scheme_id: id })
    .orderBy( 'steps.step_number' );
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then( ([id]) => {
        findById(id);
    })
}

function update(changes, id){
    return db('schemes')
    .where('id', id)
    .update(changes)
    .then( count => {
        count > 0 ? this.findById(id) : null;      
    })

}

function remove(id){
    return db('schemes')
    .where('id', id)
    .delete()    
    .then( count => {
        count > 0 ? this.findById(id) : null;   
    })

}







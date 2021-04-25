const Department = require("../model/department")

const validator = require("../config/validator")

exports.all = async(req, res) => {
    let departments

    try {
        departments = await Department.find({})
        return res.status(200).json({message: "All Departments", departments})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('code') && err.code == 11000 ? `Duplicate Fields` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

exports.department = async(req, res) => {
    let department
    let id

    try {
        id = req.params.id
        console.log(req.params.id);
        department = await Department.findById(id)
        return res.status(200).json({message: "All Departments", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('kind') && err.kind == "ObjectId" ? `Department ID Not Found` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

exports.create = async(req, res) => {
    let department

    try {
        let obj = {
            'title': `required|string`,
            'otherFields': `required|array`,
            'otherFields.*': 'required|object',
            'contactPerson': 'required|object',
            'contactPerson.name': 'required|string',
            'contactPerson.email': 'required|email',
            'contactPerson.telephone': 'required|phoneNumber',
            'contactPerson.otherFields': 'required|array',
            'contactPerson.otherFields.*': 'required|object',
        }

        let valid = await validator.validate_request(req.body, obj)
        if(!valid.matched) return res.status(422).json({ message: validator.error_message(valid.errors), error: validator.pile_error_messages(valid.errors) })
        
        department = new Department(req.body)
        await department.save()

        return res.status(200).json({message: "Department Created Successfully", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('code') && err.code == 11000 ? `Duplicate Fields` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

exports.update = async(req, res) => {
    let department
    let id

    try {
        let obj = {
            'id': `required|string`,
            'title': `required|string`,
            'otherFields': `required|array`,
            'otherFields.*': 'required|object',
            'contactPerson': 'required|object',
            'contactPerson.name': 'required|string',
            'contactPerson.email': 'required|email',
            'contactPerson.telephone': 'required|phoneNumber',
            'contactPerson.otherFields': 'required|array',
            'contactPerson.otherFields.*': 'required|object',
        }

        let valid = await validator.validate_request(req.body, obj)
        if(!valid.matched) return res.status(422).json({ message: validator.error_message(valid.errors), error: validator.pile_error_messages(valid.errors) })

        id = req.body.id
        delete req.body['id']
        console.log(id, req.body);
        
        department = await Department.findOneAndUpdate({_id: id}, req.body, {new: true})
        // department = Department.findById(id)
        console.log(department)

        return res.status(200).json({message: "Department Updated Successfully", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('code') && err.code == 11000 ? `Duplicate Fields` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

exports.delete = async(req, res) => {}
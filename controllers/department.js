const Department = require("../model/department")

const validator = require("../config/validator")

// Get All Departments
exports.all = async(req, res) => {
    let departments

    try {
        departments = await Department.find({})
        return res.status(200).json({message: "All Departments", departments})
    } catch(err) {
        console.log(err);
        let message = `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

// Get A Department
exports.department = async(req, res) => {
    let department
    let id

    try {
        id = req.params.id
        
        department = await Department.findById(id)
        if(!department) return res.status(422).json({message: "Department Does Not Exist"})
        return res.status(200).json({message: "Department Details", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('kind') && err.kind == "ObjectId" ? `Department ID Not Found` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

// Create A Department
exports.create = async(req, res) => {
    let department

    try {
        let obj = {
            'title': `required|string`,
            'otherFields': `required|object`,
            'otherFields.*': 'required|string',
            'contactPerson': 'required|object',
            'contactPerson.name': 'required|string',
            'contactPerson.email': 'required|email',
            'contactPerson.telephone': 'required|phoneNumber',
            'contactPerson.otherFields': 'required|object',
        }

        let valid = await validator.validate_request(req.body, obj)
        if(!valid.matched) return res.status(422).json({ message: validator.error_message(valid.errors), error: validator.pile_error_messages(valid.errors) })
        
        department = new Department(req.body)
        if(!department) return res.status(422).json({message: "Department Does Not Exist"})
        await department.save()

        return res.status(200).json({message: "Department Created Successfully", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('code') && err.code == 11000 ? `Duplicate Fields` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

// Update A Department
exports.update = async(req, res) => {
    let department
    let id

    try {
        let obj = {
            'id': `required|string`,
            'title': `required|string`,
            'otherFields': `required|object`,
            'contactPerson': 'required|object',
            'contactPerson.name': 'required|string',
            'contactPerson.email': 'required|email',
            'contactPerson.telephone': 'required|phoneNumber',
            'contactPerson.otherFields': 'required|object',
        }

        let valid = await validator.validate_request(req.body, obj)
        if(!valid.matched) return res.status(422).json({ message: validator.error_message(valid.errors), error: validator.pile_error_messages(valid.errors) })

        id = req.body.id
        delete req.body['id']
        
        department = await Department.findOneAndUpdate({_id: id}, req.body, {new: true})
        if(!department) return res.status(422).json({message: "Department Does Not Exist"})

        return res.status(200).json({message: "Department Updated Successfully", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('code') && err.code == 11000 ? `Duplicate Fields` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

// Delete A Department
exports.delete = async(req, res) => {
    let department
    let id

    try {
        id = req.params.id
        department = await Department.findOneAndDelete({_id: id})
        if(!department) return res.status(422).json({message: "Department Does Not Exist"})

        return res.status(200).json({message: "Department Deleted Successfully", department})
    } catch(err) {
        console.log(err);
        let message = typeof err === 'object' && err.hasOwnProperty('kind') && err.kind == "ObjectId" ? `Department ID Not Found` : `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}

// Search For A Department
exports.search = async(req, res) => {
    let departments

    try {
        let obj = {
            'title': `required|string`,
        }

        let valid = await validator.validate_request(req.body, obj)
        if(!valid.matched) return res.status(422).json({ message: validator.error_message(valid.errors), error: validator.pile_error_messages(valid.errors) })

        let {title} = req.body
        console.log(title);
        
        departments = await Department.find({title: { $regex: title, $options: 'i'}})

        return res.status(200).json({message: "Departments", departments})
    } catch(err) {
        console.log(err);
        let message = `Something Went Wrong`
        return res.status(422).json({message, error: err})
    }
}
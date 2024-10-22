import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeForm: FormGroup = new FormGroup({})
  employeeObj: EmployeeModel = new EmployeeModel()
  employeeList : EmployeeModel[] =[]
  isVisible : boolean =  false 

  constructor(){
    this.createForm()
    const oldData =localStorage.getItem("EmpData")
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeList = parseData
    }  
  }

  createForm=()=>{
    this.employeeForm= new FormGroup({
      id : new FormControl(this.employeeObj.id),
      name : new FormControl(this.employeeObj.name),
      age : new FormControl(this.employeeObj.age),
      desig : new FormControl(this.employeeObj.desig),
      salary : new FormControl(this.employeeObj.salary),
      place : new FormControl(this.employeeObj.place)
    })
  }

  OnSave=()=>{
    const oldData =localStorage.getItem("EmpData")
    if(oldData != null){
      const parseData = JSON.parse(oldData)
      this.employeeForm.controls['id'].setValue(parseData.length+1)
      this.employeeList.push(this.employeeForm.value)
    }else{
      this.employeeList.push(this.employeeForm.value)
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
  }

  OnEdit=(item : EmployeeModel)=>{
    this.employeeObj = item
    this.createForm()
    this.isVisible =  true
  }

  OnUpdate=()=>{
    const record = this.employeeList.find(m=>m.id == this.employeeForm.controls['id'].value)
    if(record != undefined){
      record.name = this.employeeForm.controls['name'].value
      record.age = this.employeeForm.controls['age'].value
      record.desig = this.employeeForm.controls['desig'].value
      record.salary = this.employeeForm.controls['salary'].value
      record.place = this.employeeForm.controls['place'].value
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
    this.employeeObj = new EmployeeModel()
    this.createForm()
  }

  OnDelete=(id: number)=>{
    const index = this.employeeList.findIndex(m=>m.id==id)
    this.employeeList.splice(index,1)
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
  }
}

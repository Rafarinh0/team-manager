import { Component, OnInit } from '@angular/core';
import { mentors } from 'src/app/models/enums/mentors';
import { locations } from 'src/app/models/enums/locations';
import { skills } from 'src/app/models/enums/skills';
import { Person } from 'src/app/models/person';
import { ModuleUtilsService } from 'src/app/services/module-utils..service';
import { ConfigService } from 'src/app/services/config.service';
import { ToastComponent } from '../common/toast/toast.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent extends ModuleUtilsService implements OnInit {

  person: Person = new Person();
  personMentor;
  personLocation;
  personSkills;

  mentorsList = mentors;
  locationsList = locations;
  skills = skills;

  personList: Person[] = [];

  showRegister = false;
  showEdit = false;
  showSuccess = false;

  constructor(public config: ConfigService, private toast: ToastComponent, private confirmationService: ConfirmationService) { super(); }

  ngOnInit(): void {
    this.getPersons();
  }

  cancel(){
    this.showEdit = false;
    this.showRegister = false;
    this.personLocation = null;
    this.personMentor = null;
    this.personSkills = null;
    this.person = new Person();
  }

  fillSkills(){
    const list : string [] = [];
    this.personSkills.forEach(skill => {
      list.push(skill.id);
    });
    this.personSkills = list;
  }

  register(){
    this.fillSkills();
    //verificar se é registro ou ediçãp
    if(this.showRegister){
      this.person.id = this.generateId();
      this.personList.push(this.person);
      this.showRegister = false;
      this.toast.openToast('success', 'Pessoa cadastrada com sucesso!');
    }else{ //is edit
      const personIndex = this.personList.findIndex(p => p.id === this.person.id);
      this.personList[personIndex] = this.person;
      this.showEdit = false;
      this.toast.openToast('success', 'Pessoa editada com sucesso!');
    }

    localStorage['setItems']('persons', JSON.stringify(this.personList));
    this.getPersons();
  }

  getPersons(){
    const list = JSON.parse(localStorage.getItem('persons')!);
    list ? this.personList = list : this.personList = [];
    this.getLocation();
  }

  getLocation(){
    this.personList.forEach((person:any)=>{
      const location = this.locationsList.find(loc=>loc.id===person.location);
      const locationName = location ? location.name : '-';
      person.locationName = locationName;
    });
  }

  editPerson(person: Person){
    this.person = Object.assign({}, person);//criar uma referencia do objeto, pra poder editar ele sem impactar outros lugares
    this.showEdit = true;
    this.personLocation = this.locationsList.find(location => location.id === person.location);
    this.personMentor = this.mentorsList.find(mentor=> mentor.id === person.mentorId);
    this.getSkills();
  }

  getSkills(){
    this.personSkills = [];
    let skill;
    if(this.person.skills){
      this.person.skills.forEach(skillId=>{
        skill = this.skills.find(s => s.id === skill.id)
        this.personSkills.push(skill);
      })
    }
  }

  delete(){
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir ${this.person.name}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const personIndex = this.personList.findIndex(p => p.id === this.person.id);
        this.personList.splice(personIndex, 1);
        this.toast.openToast('success', 'Pessoa Excluída com sucesso');
        localStorage.setItem('persons', JSON.stringify(this.personList));
        this.cancel();
        this.getPersons(); // reload data
      }
    });
  }

}

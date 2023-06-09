import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.css']
})
export class CadastroPrestadorComponent {

  companyRegisterForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.companyRegisterForm = this.fb.group({
      socialReason: ['', Validators.required],
      fantasyName: ['', Validators.required],
      typePerson: ['', Validators.required],
      cpfCnpj: ['', Validators.compose([ Validators.required,Validators.maxLength(18)])],
      address: ['', Validators.required ],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      cep: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      number: ['', Validators.required],
      occupation: ['', Validators.required],
      specialization: ['', Validators.required],
      image: ['', Validators.required],
      terms: ['', Validators.required]
    })
  }

  //Todo: Funções que checam os campos e se estão validos

  checkReason(){
    return this.companyRegisterForm.controls['socialReason'].dirty && this.companyRegisterForm.hasError('required' , 'socialReason');
  }

  checkFantasyName(){
    return this.companyRegisterForm.controls['fantasyName'].dirty && this.companyRegisterForm.hasError('required', 'fantasyName');
  }

  checkTypePerson(){
    return this.companyRegisterForm.controls['typePerson'].dirty && this.companyRegisterForm.hasError('required', 'typePerson');
  }

  checkCpfCnpj(){
    return this.companyRegisterForm.controls['cpfCnpj'].dirty && this.companyRegisterForm.hasError('required', 'cpfCnpj');
  }

  checkCpfCnpjValid(){
    return this.companyRegisterForm.controls['cpfCnpj'].dirty && this.companyRegisterForm.hasError('maxlength', 'cpfCnpj');
  }

  checkAddress(){
    return this.companyRegisterForm.controls['address'].dirty && this.companyRegisterForm.hasError('required', 'address');
  }

  checkNeighborhood(){
    return this.companyRegisterForm.controls['neighborhood'].dirty && this.companyRegisterForm.hasError('required', 'neighborhood');
  }

  checkCity(){
    return this.companyRegisterForm.controls['city'].dirty && this.companyRegisterForm.hasError('required', 'city');
  }

  checkCep(){
    return this.companyRegisterForm.controls['cep'].dirty && this.companyRegisterForm.hasError('required', 'cep');
  }
  checkCepValid(){
    return this.companyRegisterForm.controls['cep'].dirty && this.companyRegisterForm.hasError('maxlength', 'cep');
  }

  checkNumber(){
    return this.companyRegisterForm.controls['number'].dirty && this.companyRegisterForm.hasError('required', 'number');
  }

  checkOccupation(){
    return this.companyRegisterForm.controls['occupation'].dirty && this.companyRegisterForm.hasError('required', 'occupation');
  }

  checkSpecialization(){

  }

  checkImage(){
    return this.companyRegisterForm.controls['image'].dirty && this.companyRegisterForm.hasError('required', 'image');
  }

  checkTerm(){
    return this.companyRegisterForm.controls['terms'].dirty && this.companyRegisterForm.hasError('required' , 'terms');
  }

  onSubmit(){
    if (this.companyRegisterForm.valid) {
      //ENVIAR DADOS PARA A API
      console.log(this.companyRegisterForm.value)
    } else {
      //Disparo do erro
      this.validateAllFormFields(this.companyRegisterForm)
    }
  }

   //Percorre o formulario e valida os inputs caso estejam vazios
   private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

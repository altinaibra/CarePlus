
export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age?: string;
  email: string;
  gender?: string;
  contact?: string; 
  address?: string; 
  password: string;
}

export interface PatientWithContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
  age?: string;
  gender?: string;
  address?: string;
  dateOfBirth?: string; 
}

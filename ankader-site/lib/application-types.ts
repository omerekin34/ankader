export const applicationStatuses = ["yeni", "inceleniyor", "kabul", "red"] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export const applicantStages = ["Lise öğrencisi", "Üniversite öğrencisi", "Mezun"] as const;
export type ApplicantStage = (typeof applicantStages)[number];

export type MembershipApplication = {
  id: string;
  createdAt: string;
  status: ApplicationStatus;
  name: string;
  email: string;
  phone: string;
  stage: ApplicantStage | "";
  school: string;
  university: string;
  department: string;
  year: string;
  city: string;
  intent: string;
  support: string;
  note: string;
};

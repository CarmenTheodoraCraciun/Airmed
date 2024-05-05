enum UserType {
    Patient = 'patient',
    Psychiatrist = 'psychiatrist',
    Psychotherapist = 'psychotherapist'
}

interface User {
    userType: UserType;
}

// drepturile fiecarui user
const userAccess = {
    [UserType.Patient]: ['/patient-home', '/patient-profile'],
    [UserType.Psychiatrist]: ['/psychiatrist-home', '/patients-list'],
    [UserType.Psychotherapist]: ['/psychotherapist-home', '/appointments']
};
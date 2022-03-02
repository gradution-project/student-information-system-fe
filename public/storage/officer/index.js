import Cookies from "universal-cookie";

const cookies = new Cookies();

export function saveOfficerData(response) {
    saveOfficerLoginTime();
    saveOfficerNumber(response.academicInfoResponse.officerId)
    saveOfficerFacultyNumber(response.academicInfoResponse.facultyResponse.facultyId);
    saveOfficerFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveOfficerStatus(response.academicInfoResponse.status);
}


/**
 * Officer Login Time
 */
export function getOfficerLoginTime(context) {
    return context.req.cookies['officerLoginTime'];
}

function saveOfficerLoginTime() {
    cookies.set('officerLoginTime', new Date(), {path: '/'});
}

export function isLoginTimeout() {
    const officerLoginTime = getOfficerLoginTime();
    const sessionTime = new Date() - officerLoginTime;
    return sessionTime > 15;
}


/**
 * Officer Number
 */
export function getOfficerNumber() {
    return cookies.get('officerNumber');
}

export function getOfficerNumberWithContext(context) {
    return context.req.cookies['officerNumber'];
}

function saveOfficerNumber(officerNumber) {
    cookies.set('officerNumber', officerNumber, {path: '/'});
}


/**
 * Officer Faculty Number
 */
export function getOfficerFacultyNumber() {
    return cookies.get('officerFacultyNumber');
}

export function getOfficerFacultyNumberWithContext(context) {
    return context.req.cookies['officerFacultyNumber'];
}

function saveOfficerFacultyNumber(officerFacultyNumber) {
    cookies.set('officerFacultyNumber', officerFacultyNumber, {path: '/'});
}


/**
 * Officer Full Name
 */
export function getOfficerFullName() {
    return cookies.get('officerFullName');
}

export function getOfficerFullNameWithContext(context) {
    return context.req.cookies['officerFullName'];
}

function saveOfficerFullName(officerName, officerSurname) {
    const officerFullName = officerName + " " + officerSurname;
    cookies.set('officerFullName', officerFullName, {path: '/'});
}


/**
 * Officer Status
 */
export function getOfficerStatus() {
    return cookies.get('officerStatus');
}

export function getOfficerStatusWithContext(context) {
    return context.req.cookies['officerStatus'];
}

function saveOfficerStatus(officerStatus) {
    cookies.set('officerStatus', officerStatus, {path: '/'});
}

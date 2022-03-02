import Cookies from "universal-cookie";

const cookies = new Cookies();

export function saveStudentData(response) {
    saveStudentLoginTime();
    saveStudentNumber(response.academicInfoResponse.studentId)
    saveStudentFacultyNumber(response.academicInfoResponse.departmentResponse.facultyResponse.facultyId);
    saveStudentDepartmentNumber(response.academicInfoResponse.departmentResponse.departmentId);
    saveStudentFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveStudentStatus(response.academicInfoResponse.status);
}


/**
 * Student Login Time
 */
export function getStudentLoginTime(context) {
    return context.req.cookies['studentLoginTime'];
}

function saveStudentLoginTime() {
    cookies.set('studentLoginTime', new Date(), {path: '/'});
}

export function isLoginTimeout() {
    const studentLoginTime = getStudentLoginTime();
    const sessionTime = new Date() - studentLoginTime;
    return sessionTime > 15;
}


/**
 * Student Number
 */
export function getStudentNumber() {
    return cookies.get('studentNumber');
}

export function getStudentNumberWithContext(context) {
    return context.req.cookies['studentNumber'];
}

function saveStudentNumber(studentNumber) {
    cookies.set('studentNumber', studentNumber, {path: '/'});
}


/**
 * Student Faculty Number
 */
export function getStudentFacultyNumber() {
    return cookies.get('studentFacultyNumber');
}

export function getStudentFacultyNumberWithContext(context) {
    return context.req.cookies['studentFacultyNumber'];
}

function saveStudentFacultyNumber(studentFacultyNumber) {
    cookies.set('studentFacultyNumber', studentFacultyNumber, {path: '/'});
}


/**
 * Student Department Number
 */
export function getStudentDepartmentNumber() {
    return cookies.get('studentDepartmentNumber');
}

export function getStudentDepartmentNumberWithContext(context) {
    return context.req.cookies['studentDepartmentNumber'];
}

function saveStudentDepartmentNumber(studentDepartmentNumber) {
    cookies.set('studentDepartmentNumber', studentDepartmentNumber, {path: '/'});
}


/**
 * Student Full Name
 */
export function getStudentFullName() {
    return cookies.get('studentFullName');
}

export function getStudentFullNameWithContext(context) {
    return context.req.cookies['studentFullName'];
}

function saveStudentFullName(studentName, studentSurname) {
    const studentFullName = studentName + " " + studentSurname;
    cookies.set('studentFullName', studentFullName, {path: '/'});
}


/**
 * Student Status
 */
export function getStudentStatus() {
    return cookies.get('studentStatus');
}

export function getStudentStatusWithContext(context) {
    return context.req.cookies['studentStatus'];
}

function saveStudentStatus(studentStatus) {
    cookies.set('studentStatus', studentStatus, {path: '/'});
}

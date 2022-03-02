import Cookies from "universal-cookie";

const cookies = new Cookies();

export function saveTeacherData(response) {
    saveTeacherLoginTime();
    saveTeacherNumber(response.academicInfoResponse.teacherId)
    saveTeacherFacultyNumber(response.academicInfoResponse.departmentResponse.facultyResponse.facultyId);
    saveTeacherDepartmentNumber(response.academicInfoResponse.departmentResponse.departmentId);
    saveTeacherFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveTeacherStatus(response.academicInfoResponse.status);
    saveTeacherRole(response.academicInfoResponse.role);
}


/**
 * Teacher Login Time
 */
export function getTeacherLoginTime(context) {
    return context.req.cookies['teacherLoginTime'];
}

function saveTeacherLoginTime() {
    cookies.set('teacherLoginTime', new Date(), {path: '/'});
}

export function isLoginTimeout() {
    const teacherLoginTime = getTeacherLoginTime();
    const sessionTime = new Date() - teacherLoginTime;
    return sessionTime > 15;
}


/**
 * Teacher Number
 */
export function getTeacherNumber() {
    return cookies.get('teacherNumber');
}

export function getTeacherNumberWithContext(context) {
    return context.req.cookies['teacherNumber'];
}

function saveTeacherNumber(teacherNumber) {
    cookies.set('teacherNumber', teacherNumber, {path: '/'});
}


/**
 * Teacher Faculty Number
 */
export function getTeacherFacultyNumber() {
    return cookies.get('teacherFacultyNumber');
}

export function getTeacherFacultyNumberWithContext(context) {
    return context.req.cookies['teacherFacultyNumber'];
}

function saveTeacherFacultyNumber(teacherFacultyNumber) {
    cookies.set('teacherFacultyNumber', teacherFacultyNumber, {path: '/'});
}


/**
 * Teacher Department Number
 */
export function getTeacherDepartmentNumber() {
    return cookies.get('teacherDepartmentNumber');
}

export function getTeacherDepartmentNumberWithContext(context) {
    return context.req.cookies['teacherDepartmentNumber'];
}

function saveTeacherDepartmentNumber(teacherDepartmentNumber) {
    cookies.set('teacherDepartmentNumber', teacherDepartmentNumber, {path: '/'});
}


/**
 * Teacher Full Name
 */
export function getTeacherFullName() {
    return cookies.get('teacherFullName');
}

export function getTeacherFullNameWithContext(context) {
    return context.req.cookies['teacherFullName'];
}

function saveTeacherFullName(teacherName, teacherSurname) {
    const teacherFullName = teacherName + " " + teacherSurname;
    cookies.set('teacherFullName', teacherFullName, {path: '/'});
}


/**
 * Teacher Status
 */
export function getTeacherStatus() {
    return cookies.get('teacherStatus');
}

export function getTeacherStatusWithContext(context) {
    return context.req.cookies['teacherStatus'];
}

function saveTeacherStatus(teacherStatus) {
    cookies.set('teacherStatus', teacherStatus, {path: '/'});
}



/**
 * Teacher Role
 */
export function getTeacherRole() {
    return cookies.get('teacherRole');
}

export function getTeacherRoleWithContext(context) {
    return context.req.cookies['teacherRole'];
}

function saveTeacherRole(teacherRole) {
    cookies.set('teacherRole', teacherRole, {path: '/'});
}

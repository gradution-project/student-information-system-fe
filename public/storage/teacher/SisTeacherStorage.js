import Cookies from "universal-cookie";

const cookies = new Cookies();

export function saveData(response) {
    saveLoginTime();
    saveNumber(response.academicInfoResponse.teacherId)
    saveFacultyNumber(response.academicInfoResponse.departmentResponse.facultyResponse.facultyId);
    saveDepartmentNumber(response.academicInfoResponse.departmentResponse.departmentId);
    saveFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveStatus(response.academicInfoResponse.status);
    saveRole(response.academicInfoResponse.role);
}

function clearData() {
    cookies.remove('teacherLoginTime', {path: '/'});
    cookies.remove('teacherNumber', {path: '/'});
    cookies.remove('teacherFacultyNumber', {path: '/'});
    cookies.remove('teacherDepartmentNumber', {path: '/'});
    cookies.remove('teacherFullName', {path: '/'});
    cookies.remove('teacherStatus', {path: '/'});
    cookies.remove('teacherRole', {path: '/'});
}


/**
 * Teacher Login Time
 */
const getLoginTimeWithContext = (context) => {
    return context.req.cookies['teacherLoginTime'];
}

const isLoginTimeout = () => {
    const teacherLoginTime = getTeacherLoginTime();
    const sessionTime = new Date() - teacherLoginTime;
    return sessionTime > 15;
}

function saveLoginTime() {
    cookies.set('teacherLoginTime', new Date(), {path: '/'});
}


/**
 * Teacher Number
 */
const getNumber = () => {
    return cookies.get('teacherNumber');
}

const getNumberWithContext = (context) => {
    return context.req.cookies['teacherNumber'];
}

function saveNumber(teacherNumber) {
    cookies.set('teacherNumber', teacherNumber, {path: '/'});
}


/**
 * Teacher Faculty Number
 */
const getFacultyNumber = () => {
    return cookies.get('teacherFacultyNumber');
}

const getFacultyNumberWithContext = (context) => {
    return context.req.cookies['teacherFacultyNumber'];
}

function saveFacultyNumber(teacherFacultyNumber) {
    cookies.set('teacherFacultyNumber', teacherFacultyNumber, {path: '/'});
}


/**
 * Teacher Department Number
 */
const getDepartmentNumber = () => {
    return cookies.get('teacherDepartmentNumber');
}

const getDepartmentNumberWithContext = (context) => {
    return context.req.cookies['teacherDepartmentNumber'];
}

function saveDepartmentNumber(teacherDepartmentNumber) {
    cookies.set('teacherDepartmentNumber', teacherDepartmentNumber, {path: '/'});
}


/**
 * Teacher Full Name
 */
const getFullName = () => {
    return cookies.get('teacherFullName');
}

const getFullNameWithContext = (context) => {
    return context.req.cookies['teacherFullName'];
}

function saveFullName(teacherName, teacherSurname) {
    const teacherFullName = teacherName + " " + teacherSurname;
    cookies.set('teacherFullName', teacherFullName, {path: '/'});
}


/**
 * Teacher Status
 */
const getStatus = () => {
    return cookies.get('teacherStatus');
}

const getStatusWithContext = (context) => {
    return context.req.cookies['teacherStatus'];
}

function saveStatus(teacherStatus) {
    cookies.set('teacherStatus', teacherStatus, {path: '/'});
}



/**
 * Teacher Role
 */
const getRole = () => {
    return cookies.get('teacherRole');
}

const getRoleWithContext = (context) => {
    return context.req.cookies['teacherRole'];
}

function saveRole(teacherRole) {
    cookies.set('teacherRole', teacherRole, {path: '/'});
}

const SisTeacherStorage = {
    saveData,
    clearData,
    getLoginTimeWithContext,
    isLoginTimeout,
    getNumber,
    getNumberWithContext,
    getFacultyNumber,
    getFacultyNumberWithContext,
    getDepartmentNumber,
    getDepartmentNumberWithContext,
    getFullName,
    getFullNameWithContext,
    getStatus,
    getStatusWithContext,
    getRole,
    getRoleWithContext
};

export default SisTeacherStorage;
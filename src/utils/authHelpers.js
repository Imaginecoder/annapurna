export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return '';
}
export function nameValidator(name) {
  if (!name) return "Name can't be empty.";
  return '';
}
export function passWordValidator(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 6)
    return 'Password must be at least 6 characters long.';
  return '';
}
export function phoneValidator(phoneNumber) {
  if (!phoneNumber) return "Mobile Number can't be empty.";
  if (phoneNumber.length < 10) return 'Invalid Phone Number.';
  return '';
}
export function roleValidator(role) {
  return role == '' ? 'Please Choose Your Role' : '';
}
export function locationValidator(name) {
  if (!name) return "Location can't be empty.";
  return '';
}

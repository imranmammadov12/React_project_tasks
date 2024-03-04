export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export function addContact(contact) {
  return { type: ADD_CONTACT, payload: contact };
}

export function deleteContact(contactId) {
  return { type: DELETE_CONTACT, payload: contactId };
}

export function updateContact(contactId, updates) {
  return { type: UPDATE_CONTACT, payload: { contactId, updates } };
}
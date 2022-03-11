import { nanoid } from 'nanoid';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsApi';
import { Form } from './ContactForm.styled';

export function ContactForm() {
  const [addCcontact] = useAddContactMutation();
  const { data } = useGetContactsQuery();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const newContact = {
      name: newName,
      phone: newNumber,
    };

    if (
      data.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`${newContact.name} is already in contacts`);
    } else {
      addCcontact(newContact);
    }

    form.reset();
  };

  const formId = nanoid();

  return (
    <Form onSubmit={handleSubmit} htmlFor={formId}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label>Number</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </Form>
  );
}

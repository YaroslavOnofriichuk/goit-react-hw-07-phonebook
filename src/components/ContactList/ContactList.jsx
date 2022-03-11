import { useSelector } from 'react-redux';
import { ContactListStyled } from './ContactList.styled';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { useGetContactsQuery } from '../../redux/contactsApi';

export function ContactList() {
  const filter = useSelector(state => state.filter.filter);
  const { data } = useGetContactsQuery();

  const filterContact = () => {
    try {
      return data.filter(contact => {
        return contact.name.toLowerCase().includes(filter);
      });
    } catch {
      return false;
    }
  };

  return (
    <>
      {filterContact() && (
        <ContactListStyled>
          {filterContact().map(contact => (
            <ContactListItem key={contact.id} contact={contact} />
          ))}
        </ContactListStyled>
      )}
    </>
  );
}

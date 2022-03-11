import { useDeleteContactMutation } from '../../redux/contactsApi';
import PropTypes from 'prop-types';

export const ContactListItem = ({ contact }) => {
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = id => {
    deleteContact(id);
  };

  return (
    <li key={contact.id}>
      {contact.name}: {contact.phone}
      <button type="button" onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object,
};

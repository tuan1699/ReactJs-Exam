const UserList = ({ users }) => {
  const listUser = users.map((user, index) => {
    return <UserCard user={user} key={index} />;
  });

  return <div className="user-list">{listUser}</div>;
};

UserList.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      fullname: PropTypes.string,
      avatar: PropTypes.string,
      job: PropTypes.string,
    })
  ),
};

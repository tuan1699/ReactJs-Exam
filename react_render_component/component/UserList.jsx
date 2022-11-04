const UserList = ({ users }) => {
  const listUser = users.map((user) => {
    return <UserCard user={user} />;
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

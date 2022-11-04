const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-thumb">
        <img src={user.avatar} alt={user.fullname} />
      </div>

      <h3 className="user-name">{user.fullname}</h3>

      <button
        className="btn-view"
        onClick={() => {
          alert(user.fullname);
        }}
      >
        VIEW PROFILE
      </button>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.string,
    fullname: PropTypes.string,
    avatar: PropTypes.string,
    job: PropTypes.string,
  }),
};

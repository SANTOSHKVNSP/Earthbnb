class User < ActiveRecord::Base

  attr_reader :password

  after_initialize :ensure_session_token

  validates :session_token, :email, presence: true, uniqueness: true
  validates :password_digest, :name, :species, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_attached_file :image, default_url: "camber.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def self.find_by_email_address(email)
    user = User.find_by_email(email)
    if user.nil?
      return nil
    else
      return user
    end
  end

  def self.check_password(user, password)
    user.is_password?(password) ? true : false
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end

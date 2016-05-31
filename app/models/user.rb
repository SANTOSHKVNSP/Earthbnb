class User < ActiveRecord::Base

  attr_reader :password

  after_initialize :ensure_session_token

  validates :session_token, :email, presence: true, uniqueness: true
  validates :password_digest, :name, :species, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end

class Reservation < ActiveRecord::Base

  validate :start_after_today
  validate :end_after_start

  belongs_to(
    :property,
    class_name: "Property",
    foreign_key: :property_id,
    primary_key: :id
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  def start_after_today
    if self.check_in < Date.today
      errors.add(:check_in, "cannot be before today")
    end
  end

  def end_after_start
    if self.check_in > self.check_out
      errors.add(:check_out, "cannot come before check in")
    end
  end

end

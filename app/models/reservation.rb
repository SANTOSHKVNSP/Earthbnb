class Reservation < ActiveRecord::Base

  validate :end_after_start

  def end_after_start
    if self.check_in > self.check_out
      errors.add(:check_out, "cannot come before check in")
    end
  end

end

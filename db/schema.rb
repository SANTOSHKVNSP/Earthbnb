# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160611171711) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "properties", force: :cascade do |t|
    t.integer  "user_id",                            null: false
    t.string   "country",                            null: false
    t.string   "address",                            null: false
    t.string   "apt",                                null: false
    t.string   "city",                               null: false
    t.string   "state",                              null: false
    t.string   "zip",                                null: false
    t.float    "lat",                                null: false
    t.float    "lon",                                null: false
    t.integer  "property_type_id",                   null: false
    t.integer  "bedrooms",                           null: false
    t.integer  "beds",                               null: false
    t.integer  "bathrooms",                          null: false
    t.integer  "accommodates",                       null: false
    t.string   "description",                        null: false
    t.string   "title",                              null: false
    t.string   "house_rules",                        null: false
    t.float    "price",                              null: false
    t.string   "currency",                           null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.boolean  "featured",           default: false
  end

  add_index "properties", ["property_type_id"], name: "index_properties_on_property_type_id", using: :btree
  add_index "properties", ["user_id"], name: "index_properties_on_user_id", using: :btree

  create_table "property_types", force: :cascade do |t|
    t.string   "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "property_id", null: false
    t.datetime "check_in",    null: false
    t.datetime "check_out",   null: false
    t.integer  "guests",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "reservations", ["property_id"], name: "index_reservations_on_property_id", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",              null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.string   "name",               null: false
    t.text     "bio"
    t.string   "species",            null: false
    t.string   "location"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "google_uid"
  end

end

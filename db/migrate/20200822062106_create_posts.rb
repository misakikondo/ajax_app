class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.boolean :checked 
      # 既読か未読かをboolean型で管理するため
      t.timestamps
    end
  end
end

# Require any additional compass plugins here.

# set the css file encoding
Encoding.default_external = "utf-8"

dist_root = "dist/"
http_images_path = "../img/common"
http_generated_images_path = "../../img"
generated_images_dir = dist_root + "img"

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# cache buster via parameter
# Increment the deploy_version before every release to force cache busting.
# deploy_version = 1
# asset_cache_buster do |http_path, real_path|
#   if File.exists?(real_path)
#     hash = Digest::MD5.file(real_path.path).hexdigest
#     hash.to_s[0, 8]
#   else
#     "v=#{deploy_version}"
#   end
# end

# cache buster via path md5
asset_cache_buster do |path, real_path|
  if File.exists?(real_path)
    pathname = Pathname.new(path)
    hash = Digest::MD5.file(real_path.path).hexdigest
    hash = hash.to_s[0, 8]
    new_path = "%s/%s-%s%s" % [http_images_path, pathname.basename(pathname.extname), hash, pathname.extname]

    {:path => new_path, :query => nil}
  end
end

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

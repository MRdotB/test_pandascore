# myapp.rb
require 'sinatra'
set :port, 2020

get '/' do
  'Hello world'
end

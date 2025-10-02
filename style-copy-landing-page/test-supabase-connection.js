// Simple test to verify Supabase connection
// Run this with: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vefcnledexjibztvsjwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZmNubGVkZXhqaWJ6dHZzand5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNzU3ODcsImV4cCI6MjA3NDg1MTc4N30.8fPRi1PTHNmw791L2rpiH0fHbag2YdlmOMfMiJW3AQo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can connect to the database
    const { data, error } = await supabase
      .from('waitlist')
      .select('count(*)')
      .single();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log('📊 Current waitlist count:', data.count);
    
    // Test 2: Try to insert a test entry
    console.log('🧪 Testing insert operation...');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email: testEmail,
        name: 'Test User',
        source: 'connection-test',
        status: 'active'
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return false;
    }
    
    console.log('✅ Insert successful!');
    console.log('📝 Created entry:', insertData);
    
    // Test 3: Clean up test entry
    console.log('🧹 Cleaning up test entry...');
    
    const { error: deleteError } = await supabase
      .from('waitlist')
      .delete()
      .eq('email', testEmail);
    
    if (deleteError) {
      console.error('⚠️ Cleanup failed (but connection works):', deleteError.message);
    } else {
      console.log('✅ Cleanup successful!');
    }
    
    console.log('🎉 All tests passed! Waitlist is ready to receive emails.');
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return false;
  }
}

testConnection();
